import api from "../../api/api";


export async function fetchQuestionList(page = '') {
    const res = await api.get(`api/forum/questions/?page=${page}`);
    return res.data
}
export async function fetchQuestionListBySemester(semester, page = '') {
    const res = await api.get(`api/forum/questions/?page=${page}&semester=${semester}`);
    return res.data
}
export async function fetchQuestionListBySearch(str) {
    const res = await api.get(`api/forum/questions/?search=${str}`);
    return res.data
}
export async function createQuestion(payload) {
    console.log(payload)
    const res = await api.post('api/forum/questions/', payload)
    return res.data;
}

export async function fetchQuestionDetail(id) {
    const res = await api.get(`api/forum/questions/${id}/`);
    return res.data;
}

export async function fetchInitalQuestionLikeStatus(id) {
    const res = await api.get(`api/forum/questions/${id}/like/`)
    return res.data;
}

export async function likeQuestion(id) {
    await api.post(`api/forum/questions/${id}/like/`);
}

export async function unlikeQuestion(id) {
    await api.delete(`api/forum/questions/${id}/like/`);
}

export async function deleteQuestion(id) {
    await api.delete(`api/forum/questions/${id}/`)
}

export async function createAnswer(payload, id) {
    const res = await api.post(`api/forum/questions/${id}/answers/`, payload)
    return res.data;
}

export async function fetchInitialAnswerLikeStatus(questionId, answerId) {
    const res = await api.get(`api/forum/questions/${questionId}/answers/${answerId}/like/`)
    return res.data;
}

export async function fetchAnswerListRelatedToSpecificQuestion(id) {
    const res = await api.get(`api/forum/questions/${id}/answers/`);
    return res.data;
}

export async function deleteAnswer(questionId, answerId) {
    await api.delete(`api/forum/questions/${questionId}/answers/${answerId}/`)
}

export async function likeAnswer(questionId, answerId) {
    const res = await api.post(`api/forum/questions/${questionId}/answers/${answerId}/like/`);
    return res.data;

}

export async function unlikeAnswer(questionId, answerId) {
    await api.delete(`api/forum/questions/${questionId}/answers/${answerId}/like/`);
}


