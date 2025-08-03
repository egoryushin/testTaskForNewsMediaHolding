import { Post, PostsResponse } from '@/entities/post/model/types'
import { RootState } from '@/shared/lib/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface PostState {
	posts: Post[]
	skip: number
	error: string | null
	loading: boolean
	hasMore: boolean
}

const initialState: PostState = {
	posts: [],
	skip: 0,
	loading: false,
	error: null,
	hasMore: true,
}

export const fetchPosts = createAsyncThunk<
	PostsResponse,
	{ skip: number; limit: number }
>('posts/fetchPosts', async ({ skip, limit }) => {
	const res = await fetch(
		`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
	)
	return await res.json()
})

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		resetPosts(state) {
			state.posts = []
			state.skip = 0
			state.hasMore = true
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			// Кейс для начального состояния
			.addCase(fetchPosts.pending, state => {
				state.loading = true
				state.error = null
			})
			// Если запрос прошел успешно
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false
				state.posts.push(...action.payload.posts)
				state.skip += action.payload.posts.length
				state.hasMore = action.payload.posts.length === 10
			})
			// Если запрос не прошел
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка загрузки'
			})
	},
})

export const { resetPosts } = postSlice.actions
export const selectPosts = (state: RootState) => state.posts.posts
export const selectLoading = (state: RootState) => state.posts.loading
export const selectHasMore = (state: RootState) => state.posts.hasMore

export default postSlice.reducer
