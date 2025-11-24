/*
    @func 根据用户ID获取用户
    @param {number} id - 用户ID
    @param {Array} users - 用户列表
    @returns {Object} - 用户对象
*/ 
async function getUserById(id, users) {
    return users.find(user => user.id === id);
}

// 根据邮箱获取用户 
async function getUserByEmail(email, users) {
    return users.find(user => user.email === email);
}