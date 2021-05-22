function objToFormData(obj) {
    const formData = new FormData()
    Object.keys(obj).map((key, i) => {
        formData.append(key, obj[key])
    })
    return formData
}

function testFormData() {
    const formData = new FormData()
    formData.append('username', 'erika31')
    formData.append('password', 'password')
    formData.append('email', 'erika31@email.com')
    return formData
}

function sortByField() {}

function filter() {}

export { objToFormData, testFormData }
