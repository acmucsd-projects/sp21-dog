function objToFormData(obj) {
    const formData = new FormData()
    Object.keys(obj).map((key, i) => {
        formData.append(key, obj[key])
    })
    return formData
}

function monthName(i) {
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    return monthNames[i]
}

export { objToFormData, monthName }
