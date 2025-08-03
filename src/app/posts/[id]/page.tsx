'use client'

import PostCard from '@/entities/post/ui/PostCard'
import { Button } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './PostDetail.module.scss'

export default function PostPage() {
	const [post, setPost] = useState(null)
	const [error, setError] = useState(false)
	const { id } = useParams()
	const router = useRouter()

	useEffect(() => {
		if (!id) return
		fetch(`https://dummyjson.com/posts/${id}`)
			.then(res => {
				if (!res.ok) throw new Error('not found')
				return res.json()
			})
			.then(setPost)
			.catch(() => setError(true))
	}, [id])

	if (error) return <div>Пост не найден</div>
	if (!post) return <div>Загрузка...</div>

	return (
		<main className={styles.wrapper}>
			<PostCard post={post} />
			<Button onClick={() => router.push('/')}> ← Back to home</Button>
		</main>
	)
}
