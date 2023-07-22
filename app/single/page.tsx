import Link from 'next/link';
import styles from "./page.module.css";


export default function SelectDifficulty() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>難易度を選択してください</h1>
      {/* 以下は例としています。実際には選択した難易度に応じたページへ遷移する必要があります */}
      <Link href="/game">
        Easy
      </Link>
      <Link href="/game">
        Medium
      </Link>
      <Link href="/game">
        Hard
      </Link>
    </div>
  );
}