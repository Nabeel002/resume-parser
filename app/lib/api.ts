const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${baseUrl}${endpoint}`
  const isFormData = options.body instanceof FormData
  let response = await fetch(url, {...options, headers: {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers
  }, credentials: 'include'})

  if(response.status === 401) {
    await fetch(`${baseUrl}/api/auth/refresh-token`, {method:"POST", credentials: 'include'});
    response = await fetch(url, {...options, headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers
    }, credentials: 'include'})
  }

  return response

}



