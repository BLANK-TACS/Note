const deleteNote = () => {
    const btnDelete = document.querySelector('.btnDelete')

    btnDelete.addEventListener('click', async () => {
        const id = document.querySelector('.card').getAttribute('data-id')

        try {
            const response = await fetch('/notes/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            if(response.ok) {
                window.location.href = '/notes'
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Server Error' });
        }
    })
}
deleteNote()