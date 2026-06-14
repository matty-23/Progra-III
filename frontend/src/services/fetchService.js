
const getApiUrl = () => import.meta.env.VITE_API_URL;

let refreshPromise = null;

async function doRefresh() {
    const res = await fetch(`${getApiUrl()}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Refresh failed');
    }

    const data = await res.json();
    localStorage.setItem('token', data.accessToken);
    return data.accessToken;
}

function refreshOnce() {
    if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

function clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    window.location.href = '/'; 
}

export async function fetchWithAuth(url, options = {}) {
    const buildRequest = (token) => fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            'Authorization': `Bearer ${token}`,
        },
    });

    let token = localStorage.getItem('token');
    let response = await buildRequest(token);

    if (response.status === 401) {
        try {
            const newToken = await refreshOnce();
            response = await buildRequest(newToken);
        } catch (error) {
            clearSession();
            throw new Error('Sesión expirada. Por favor, vuelve a iniciar sesión.');
        }
    }

    if (!response.ok) {
        const error = new Error(`Error HTTP: ${response.status}`);
        error.status = response.status;
        throw error;
    }

    const contentType = response.headers.get('content-type') || '';
    if (response.status === 204 || !contentType.includes('application/json')) {
        return null; 
    }

    return response.json();
}



