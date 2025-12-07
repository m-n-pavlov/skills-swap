export type TServerResponse<T> = {
  success: boolean;
} & T;

export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    const err = await res.json().catch(() => ({}));
    return Promise.reject(err);
  }
};
