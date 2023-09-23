exports.pick = (obj, keys) => {
    return keys.reduce((final, key) => {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            final[key] = obj[key]
        }

        return final
    }, {})
}