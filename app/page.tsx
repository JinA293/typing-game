import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';



export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.title}>
        <Link href="/play">
          ゲームを始める
        </Link>
      </div>
    </main>
  )
}
