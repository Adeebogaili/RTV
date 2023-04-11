
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider'

export default function Profile() {
    const { user, updateUser } = useContext(UserContext)
    const [updatedUser, setUpdatedUser] = useState({
        fname: user.fname,
        lname: user.lname,
        profileImage: user.profileImage
    })

    function handleChange(e) {
        const { name, value } = e.target
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        updateUser(updatedUser)
    }

    return (
        <div>
            <h1>Coming Soon!</h1>
        </div>
    )
}
