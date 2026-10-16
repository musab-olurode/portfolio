/** Where I work from. Internal only: the page shows "GMT+1", never this zone name. */
export const MY_TZ = 'Africa/Lagos';

const HOUR = 3_600_000;
const WORK_START = 9;
const WORK_END = 17;

/** `overlapHours` is null when the visitor's zone is unknown or hidden (invalid, UTC, Etc/*). */
export interface Overlap {
	myTime: string;
	overlapHours: number | null;
	visitorPlace: string | null;
}

function isValidZone(tz: string | undefined): tz is string {
	if (!tz) return false;
	try {
		new Intl.DateTimeFormat('en-GB', { timeZone: tz });

		return true;
	} catch {
		return false;
	}
}

/** Calendar date in `tz` and the zone's offset from UTC (ms) at `now`. */
function zoneParts(now: Date, tz: string) {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: tz,
		hourCycle: 'h23',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).formatToParts(now);
	const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
	const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
	const offset = asUtc - Math.floor(now.getTime() / 1000) * 1000;

	return {
		year: get('year'),
		month: get('month') - 1,
		day: get('day'),
		hour: get('hour'),
		minute: get('minute'),
		offset,
	};
}

const isHiddenZone = (tz: string) => tz === 'UTC' || tz.startsWith('Etc/') || !tz.includes('/');

function placeFromZone(tz: string): string | null {
	if (tz === MY_TZ || isHiddenZone(tz)) return null;

	return (tz.split('/').at(-1) ?? tz).replace(/_/g, ' ');
}

export function getOverlap(now: Date, visitorTz: string | undefined): Overlap {
	const mine = zoneParts(now, MY_TZ);
	const pad = (n: number) => String(n).padStart(2, '0');
	const myTime = `${pad(mine.hour)}:${pad(mine.minute)}`;

	if (!isValidZone(visitorTz) || isHiddenZone(visitorTz)) return { myTime, overlapHours: null, visitorPlace: null };

	const tz = visitorTz;
	const theirs = zoneParts(now, tz);

	const day = Date.UTC(theirs.year, theirs.month, theirs.day);
	const theirStart = day + WORK_START * HOUR - theirs.offset;
	const theirEnd = day + WORK_END * HOUR - theirs.offset;
	const myStart = day + WORK_START * HOUR - mine.offset;
	const myEnd = day + WORK_END * HOUR - mine.offset;
	const shared = Math.min(theirEnd, myEnd) - Math.max(theirStart, myStart);

	return { myTime, overlapHours: Math.max(0, Math.floor(shared / HOUR)), visitorPlace: placeFromZone(tz) };
}

export function overlapSentence(o: Overlap): string {
	if (o.overlapHours === null) return 'I work 09:00–17:00 GMT+1 and shift my hours to meet the team.';
	if (o.overlapHours === 0) return "Our workdays don't overlap, but I shift my hours to meet the team.";
	if (o.overlapHours === WORK_END - WORK_START && o.visitorPlace === null) return "We'd share the whole workday.";
	const hours = `${o.overlapHours} hour${o.overlapHours === 1 ? '' : 's'}`;

	return `That's ${hours} of overlap with your workday${o.visitorPlace ? ` in ${o.visitorPlace}` : ''}.`;
}
