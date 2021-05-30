function objToFormData(obj) {
    const formData = new FormData()
    Object.keys(obj).map((key, i) => {
        formData.append(key, obj[key])
    })
    return formData
}

function sortByField() {}

function filter() {}

export { objToFormData }
