import {useRouter} from 'next/router'

export function useQueryParams(queryParamName) {
  const router = useRouter()

  function setQueryParam(newQueryParamValue) {
    router.push({
      pathname: router.basePath,
      query: {
        ...router.query,
        [queryParamName]: newQueryParamValue,
      },
    })
  }

  let currentQueryParamValue = router.query[queryParamName] || ''
  return [currentQueryParamValue, setQueryParam]
}
