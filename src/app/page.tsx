import PostsList from '@/features/postsList/ui/PostsList'

import styles from '@/app/page.module.scss'

export default function Home() {
	return (
		<main className={styles.wrapper}>
			<h1>📰 Лента новостей 🗞</h1>
			<PostsList />
		</main>
	)
}
