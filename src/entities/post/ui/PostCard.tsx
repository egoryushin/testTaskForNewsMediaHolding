import { Card, Tag, Typography } from 'antd'
import Link from 'next/link'

import { Post } from '@/entities/post/model/types'

import styles from '../styles/PostCard.module.scss'

const { Title, Paragraph, Text } = Typography

export default function PostCard({ post }: { post: Post }) {
	return (
		<Link href={`/posts/${post.id}`} className={styles.link}>
			<Card hoverable className={styles.card}>
				<Title level={4}>{post.title}</Title>
				{/* Эллипсис отобржает 3 строки (как по ТЗ) */}
				<Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>
				<div className={styles.tags}>
					{post.tags.map(tag => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>
				<div className={styles.footer}>
					<Text>
						👍 {post.reactions.likes} | 👎 {post.reactions.dislikes}
					</Text>
					<Text type='secondary'>👁️ {post.views}</Text>
				</div>
			</Card>
		</Link>
	)
}
