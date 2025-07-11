export const genres = [
  {
    value: 'Action',
    label: 'Action'
  },
  {
    value: 'Adventure',
    label: 'Adventure'
  },
  {
    value: 'Comedy',
    label: 'Comedy'
  },
  {
    value: 'Drama',
    label: 'Drama'
  },
  {
    value: 'Ecchi',
    label: 'Ecchi'
  },
  {
    value: 'Fantasy',
    label: 'Fantasy'
  },
  {
    value: 'Horror',
    label: 'Horror'
  },
  {
    value: 'Mahou Shoujo',
    label: 'Mahou Shoujo'
  },
  {
    value: 'Mecha',
    label: 'Mecha'
  },
  {
    value: 'Music',
    label: 'Music'
  },
  {
    value: 'Mystery',
    label: 'Mystery'
  },
  {
    value: 'Psychological',
    label: 'Psychological'
  },
  {
    value: 'Romance',
    label: 'Romance'
  },
  {
    value: 'Sci-Fi',
    label: 'Sci-Fi'
  },
  {
    value: 'Slice of Life',
    label: 'Slice of Life'
  },
  {
    value: 'Sports',
    label: 'Sports'
  },
  {
    value: 'Supernatural',
    label: 'Supernatural'
  },
  {
    value: 'Thriller',
    label: 'Thriller'
  }
] as const

const currentYear = new Date().getFullYear()
export const years = Array.from({ length: currentYear - 1940 + 2 }, (_, i) => '' + (currentYear + 2 - i)).map(value => ({ value, label: value }))

export const seasons = [
  {
    value: 'SPRING',
    label: 'Spring'
  },
  {
    value: 'SUMMER',
    label: 'Summer'
  },
  {
    value: 'FALL',
    label: 'Fall'
  },
  {
    value: 'WINTER',
    label: 'Winter'
  }
] as const

export const formats = [
  {
    value: 'TV',
    label: 'TV Show'
  },
  {
    value: 'MOVIE',
    label: 'Movie'
  },
  {
    value: 'TV_SHORT',
    label: 'TV Short'
  },
  {
    value: 'OVA',
    label: 'OVA'
  },
  {
    value: 'ONA',
    label: 'ONA'
  }
] as const

export const status = [
  {
    value: 'RELEASING',
    label: 'Airing'
  },
  {
    value: 'FINISHED',
    label: 'Finished'
  },
  {
    value: 'NOT_YET_RELEASED',
    label: 'Not Yet Aired'
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled'
  }
] as const

export const sort = [
  {
    value: 'TITLE_ROMAJI_DESC',
    label: 'Name'
  },
  {
    value: 'START_DATE_DESC',
    label: 'Release Date'
  },
  {
    value: 'SCORE_DESC',
    label: 'Score'
  },
  {
    value: 'POPULARITY_DESC',
    label: 'Popularity'
  },
  {
    value: 'TRENDING_DESC',
    label: 'Trending'
  },
  {
    value: 'UPDATED_AT_DESC',
    label: 'Updated Date'
  },
  {
    value: 'TITLE_ROMAJI',
    label: 'Name Asc'
  },
  {
    value: 'START_DATE',
    label: 'Release Date Asc'
  },
  {
    value: 'SCORE',
    label: 'Score Asc'
  },
  {
    value: 'POPULARITY',
    label: 'Popularity Asc'
  },
  {
    value: 'TRENDING',
    label: 'Trending Asc'
  },
  {
    value: 'UPDATED_AT',
    label: 'Updated Date Asc'
  }
] as const

export const onlist = [
  {
    value: 'true',
    label: 'On List'
  },
  {
    value: 'false',
    label: 'Not On List'
  }
] as const
