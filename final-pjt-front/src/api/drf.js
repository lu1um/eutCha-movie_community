const HOST = 'http://localhost:8000/api/v1/'

const ACCOUNTS = 'accounts/'
const ARTICLES = 'articles/'
const COMMENTS = 'comments/'
const MOVIES = 'movies/'

export default {
  accounts: {
    login: () => HOST + ACCOUNTS + 'login/',
    logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + 'signup/',
    // Token 으로 현재 user 판단
    // currentUserInfo: () => HOST + ACCOUNTS + 'user/',
    // username으로 프로필 제공
    profile: username => HOST + ACCOUNTS + 'profile/' + username,
  },
  articles: {
    articles: () => HOST + ARTICLES,
    // article: articlePk => HOST + ARTICLES + `${articlePk}/`,
    comments: articlePk => HOST + ARTICLES + `${articlePk}/` + COMMENTS,
    // comment: (articlePk, commentPk) =>
    //   HOST + ARTICLES + `${articlePk}/` + COMMENTS + `${commentPk}/`,
    // community: page => HOST + ARTICLES + 'community/' + `${page}/`,
  },
  movies: {
    movieAlgorithm: () => HOST + MOVIES + 'eut/',
    movieGenre: () => HOST + MOVIES + 'eut-genre/',
    moviePopular: () => HOST + MOVIES + 'popular/',
    movieRecent: () => HOST + MOVIES + 'recent/',
    newMovie: () => HOST + MOVIES + 'new/',
    // movie: moviePk => HOST + MOVIES + `${moviePk}/`,
    // movieLike: () => HOST + MOVIES + `${moviePk}/` + 'like/',
    // movieDislike: () => HOST + MOVIES + `${moviePk}/` + 'dislike/',
  },
}
