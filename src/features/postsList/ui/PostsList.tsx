'use client'
import { Spin } from 'antd'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	fetchPosts,
	selectHasMore,
	selectLoading,
	selectPosts,
} from '@/entities/post/model/postSlice'
import PostCard from '@/entities/post/ui/PostCard'
import { AppDispatch } from '@/shared/lib/store'

import styles from '../styles/PostsList.module.scss'

export default function PostsList() {
	const dispatch = useDispatch<AppDispatch>()
	const posts = useSelector(selectPosts)
	const loading = useSelector(selectLoading)
	const hasMore = useSelector(selectHasMore)
	const observerRef = useRef<HTMLDivElement | null>(null)

	// Инициализация постов при первом рендере
	useEffect(() => {
		if (posts.length === 0) {
			dispatch(fetchPosts({ skip: 0, limit: 10 }))
		}
	}, [dispatch, posts.length])

	// Использую обсервер для ленивой подгрузки постов
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const first = entries[0]
				if (first.isIntersecting && hasMore && !loading) {
					dispatch(fetchPosts({ skip: posts.length, limit: 10 }))
				}
			},
			{ threshold: 1.0 } // при попадании 100% в видимую область
		)

		// Наблюдаем за последним элементом списка
		const currentRef = observerRef.current
		if (currentRef) observer.observe(currentRef)

		return () => {
			// Отписываемся от наблюдения
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [dispatch, hasMore, loading, posts.length])

	return (
		<div className={styles.wrapper}>
			{posts.map(post => (
				<PostCard key={post.id} post={post} />
			))}
			<div ref={observerRef} className={styles.observer} />
			{loading && <Spin className={styles.loader} />}
		</div>
	)
}
