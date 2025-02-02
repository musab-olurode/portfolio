import styles from '../../styles/Page.module.scss';

type Props = {
	children: React.ReactNode;
};

const Page = ({ children }: Props) => <div className={styles.page}>{children}</div>;

export default Page;
