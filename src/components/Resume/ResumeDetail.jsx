import { Row, Col, Rate, Divider, Breadcrumb } from 'antd';
import ImageGallery from 'react-image-gallery';
import { MinusOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ResumeLoader from './ResumeLoader';
import './resume.scss'

const ResumeDetail = (props) => {
    const { dataResume: dataResume } = props;

    const [currentQuantity, setCurrentQuantity] = useState(1);
    const refGallery = useRef(null);
    const images = dataResume?.items ?? [];

    const dispatch = useDispatch();

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}storage/resume/${dataResume?.images}`;

    const handleChangeButton = (type) => {
        if (type === 'MINUS') {
            if (currentQuantity - 1 <= 0) return;
            setCurrentQuantity(currentQuantity - 1);
        }
        if (type === 'PLUS') {
            if (currentQuantity === +dataResume.quantity) return; //max
            setCurrentQuantity(currentQuantity + 1);
        }
    }

    const handleChangeInput = (value) => {
        if (!isNaN(value)) {
            if (+value > 0 && +value < +dataResume.quantity) {
                setCurrentQuantity(+value);
            }
        }
    }

    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }))
    }

    const handleBuyNow = (quantity, book) => {
        // dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }))
        // navigate('/order');
    }


    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <Breadcrumb
                    style={{ margin: '5px 0' }}
                    items={[
                        {
                            title: <HomeOutlined />,
                        },
                        {
                            title: (
                                <Link to={'/'}>
                                    <span>Trang Chủ</span>
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <span>Resume detail</span>
                            ),
                        }
                    ]}
                />
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataResume && dataResume.id ?
                        <Row gutter={[20, 20]}>
                            <Col md={10} sm={0} xs={0}>
                                <div className='thumbnail'>
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}storage/resume/${dataResume.images}`} alt="thumbnail book" />
                                </div>
                            </Col>
                            <Col md={14} sm={24}>
                                <Col span={24}>
                                    <div className='author'>Tác giả: <a href='#'>{dataResume?.user.name}</a> </div>
                                    <div className='title'>{dataResume?.mainText}</div>
                                    <div className='rating'>
                                        Đánh giá:
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                    </div>
                                    <div className='price'>
                                        <span className='currency'>
                                            {dataResume?.jobTitle}
                                        </span>
                                    </div>
                                    <div className='delivery'>
                                        <div>
                                            <span className='left-side'>Giới thiệu: </span>
                                            <span className='right-side'>{dataResume.description}</span>
                                        </div>
                                    </div>
                                    {/* <div className='quantity'>
                                        <span className='left-side'>Số lượng</span>
                                        <span className='right-side'>
                                            <button onClick={() => handleChangeButton('MINUS')} ><MinusOutlined /></button>
                                            <input onChange={(event) => handleChangeInput(event.target.value)} value={currentQuantity} />
                                            <button onClick={() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                                        </span>
                                    </div> */}
                                    <div className='buy'>
                                        <button className='cart' onClick={() => handleAddToCart(currentQuantity, dataResume)}>
                                            <FaRegHeart className='icon-cart' />
                                            <span>Thêm vào yêu thích</span>
                                        </button>
                                        <button
                                            className='now'
                                            onClick={() => handleBuyNow(currentQuantity, dataResume)}
                                        >Đặt lịch hẹn</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        :
                        <ResumeLoader />
                    }
                </div>
            </div>
            {/* <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={dataBook?.mainText}
            /> */}
        </div>

    )
}
export default ResumeDetail;