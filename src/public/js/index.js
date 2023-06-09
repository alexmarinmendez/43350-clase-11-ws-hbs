let socket = io()
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Set username for the Chat',
    inputValidator: value => {
        return !value.trim() && 'Please write a valid username'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    document.getElementById('user').innerHTML = user
})

chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
})

socket.on('logs', data => {
    const divLogs = document.getElementById('messagesLogs')
    let messages = ''
    data.reverse().forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    })
    divLogs.innerHTML = messages
})