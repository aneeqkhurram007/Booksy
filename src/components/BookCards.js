import { Card, Row, Col, Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const BookCards = ({ books }) => {
    const { userType } = useSelector(state => state.user)
    return (
        <Row justify='space-between px-2'>
            <div>{
                books.map(book => (
                    <Col key={book.id} className="my-4">
                        <Card className='border rounded-lg flex flex-col justify-center items-center' size="default" bordered={true} >
                            <img className='w-44 h-44 mx-auto' src={book?.imageDownloadUrl} />
                            <h4 className="text-lg font-semibold">
                                {book.title}
                            </h4>
                            <div className='flex justify-between space-x-2'>
                                <p className="text-base font-semibold">Language:
                                    <span className='font-semibold text-green-500'>{book?.language}</span></p>
                                <p className="text-base font-semibold">Genre:
                                    <span className='font-semibold text-green-500'>{book?.genre}</span></p>
                            </div>
                            {userType === "User" && (

                                <div className='flex justify-between mt-4'>
                                    <Button size='small' className='bg-blue-400' type="primary"><a href={book?.fileDownloadUrl}>Download Book</a></Button>
                                    <Button size='small' className='bg-orange-400' type="primary">Leave a Review</Button>
                                </div>

                            )}

                        </Card>
                    </Col>

                ))
            }</div>
        </Row>
    )
}

export default BookCards