import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getDoc, doc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../firebase"
import { setUserData } from '../slices/userSlice'
import { Alert, Button, Input } from 'antd'
import { getDownloadURL, ref, upload, uploadBytes } from 'firebase/storage'
const IndexAuthor = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [hidden, sethidden] = useState(true)
    const [book, setbook] = useState({
        title: "",
        genre: "",
        bookCover: "",
        book: "",
        edition: 1,
        language: "",
        numberOfPages: 1,
        volumes: 0
    })
    const [alertMessage, setalertMessage] = useState(null)
    useEffect(() => {
        if (!user.userAuth) {
            navigate("/login", { replace: true })
        }
        else {
            async function getUserData(params) {
                try {
                    const userDoc = await getDoc(doc(db, `authors/${user.userAuth.uid}`))
                    dispatch(setUserData({
                        userData: {
                            id: userDoc.id,
                            ...userDoc.data(),
                            timestamp: Date.now()
                        }
                    }))
                } catch (error) {
                    console.log(error)
                }
            }
            getUserData()
        }
    }, [user.userAuth])
    useEffect(() => {
        setTimeout(() => {
            setalertMessage(null)
        }, 5000);
    }, [alertMessage])
    const { userData } = user
    const changeHandler = (e) => {
        setbook({ ...book, [e.target.name]: e.target.value })
    }
    const uploadFile = (e) => {
        setbook({ ...book, [e.target.name]: e.target.files[0] })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const { book: bookFile, bookCover, ...bookData } = book
        try {
            const bookDoc = await addDoc(collection(db, "books"), {
                ...bookData,
                authorName: `${userData.firstName} ${userData.lastName}`,
                author_email: userData.email,
                timestamp: serverTimestamp()
            })
            let fileDownloadUrl = "";
            let imageDownloadUrl = "";
            if (bookFile) {

                const storageRef = ref(storage, `books/${bookDoc.id}/${bookFile.name}`);
                await uploadBytes(storageRef, bookFile)
                fileDownloadUrl = await getDownloadURL(storageRef)
            }
            if (bookCover) {
                const storageRef = ref(storage, `books/${bookDoc.id}/${bookCover.name}`);
                await uploadBytes(storageRef, bookCover)
                imageDownloadUrl = await getDownloadURL(storageRef)

            }
            await updateDoc(doc(db, `books/${bookDoc.id}`), {
                fileDownloadUrl,
                imageDownloadUrl
            })
            setbook({
                title: "",
                genre: "",
                bookCover: "",
                book: "",
                edition: 1,
                language: "",
                numberOfPages: 1,
                volumes: 0
            })
            setalertMessage({
                type: "success",
                message: "Book uploaded successfully ..."
            })
        } catch (error) {
            console.log(error)
            setalertMessage({
                type: "failed",
                message: error.message
            })
        }
    }
    return (
        <div className='min-h-screen p-4 bg-slate-100'>
            <h1 className='text-2xl text-center font-semibold'>Welcome {userData?.firstName} {userData?.lastName}</h1>
            <h3 className='text-xl underline underline-offset-4 my-2 font-semibold'>Books uploaded by you.</h3>

            <Button type="primary" onClick={() => sethidden(false)} className="bg-blue-400" size="large" >Add a new book</Button>
            {
                alertMessage?.type === "success" && (<Alert type='success' message={alertMessage.message} />)}
            {alertMessage?.type === "failed" && (<Alert
                type='error' message={alertMessage.message}
            />)
            }            <form onSubmit={submitForm} className={`${hidden ? "hidden" : "flex"} mt-10 flex-col space-y-4 w-1/2 mx-auto`}>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Title</label>
                    <Input name="title" required onChange={changeHandler} value={book.title} />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Genre</label>
                    <Input name="genre" onChange={changeHandler} value={book.genre} />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Language</label>
                    <Input name="language" onChange={changeHandler} value={book.language} />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Edition</label>
                    <Input name="edition" onChange={changeHandler} value={book.edition} type="number" min={1} />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Pages</label>
                    <Input name="numberOfPages" onChange={changeHandler} value={book.numberOfPages} type="number" min={1} />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Volumes</label>
                    <Input name="volumes" onChange={changeHandler} value={book.volumes} type="number" min={0} />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Book Cover</label>
                    <Input name="bookCover" onChange={uploadFile} accept="image/*" type="file" />
                </div>
                <div className='flex w-full justify-between px-2'>
                    <label className='w-1/2'>Book</label>
                    <Input name="book" required onChange={uploadFile} accept="*.pdf,*.docx,*.doc" type="file" />
                </div>
                <div>
                    <Button type='primary' htmlType='submit' className='rounded bg-blue-400'>Add Book</Button>
                </div>
            </form>
        </div>
    )
}

export default IndexAuthor