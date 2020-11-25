const newObj = (oldObj, oldProperties) => {
    return {
        ...oldObj,
        ...oldProperties
    }
}

export default newObj;