import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Categories from '../categories/Categories';
import { useFormik } from 'formik';
import Loader from '../../loader/Loader.jsx';

export default function AllProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [rating, setRating] = useState(1);
    const productPerPage = 4;
    const [sortValue, setSortValue] = useState('');
    const [search, setSearch] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');



    let [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const sortOptions = [
        {
            lable: "Sort By",
            value: '',
        },
        {
            lable: "price low to high",
            value: 'price',
        },
        {
            lable: "price high to low",
            value: '-price',
        },
        {
            lable: "Best rated",
            value: 'avgRating',
        },
    ]
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
        setSortValue('');
        setMax('');
        setMin('');
        console.log(searchValue);

    };
    const handleMinVlaue = (event) => {
        const maxValue = event.target.value;
        setMin(maxValue);
        setSearch('');
        setSortValue('');
        console.log(maxValue);

    };
    const handleMaxValue = (event) => {
        const minValue = event.target.value;
        setMax(minValue);
        setSearch('');
        setSortValue('');
        console.log(minValue);

    };

    const handleSelectedOption = (event) => {
        event.preventDefault();
        const selectedOption = event.target.value;
        setSortValue(selectedOption);
        sort(selectedOption);
        setSearch('');
        setMax('');
        setMin('');

    };
    const nextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);

        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const pageClicked = (page) => {
        setPage(page);
    };


    const getMinMax = async ({ min, max }) => {

        console.log('getMinMax');
        setLoader(true);


        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${productPerPage}&price[gte]=${min}&price[lte]=${max}`);
            navigate(`/products?page=${page}&limit=${productPerPage}&price[gte]=${min}&price[lte]=${max}`);
            setTotalPages(Math.ceil(data.total / productPerPage));
            setAllProducts(data.products);
            console.log(data);

            if (data.message == 'success') {
                setLoader(false);

            }


        } catch (error) {
            console.error(error);

        }


    };


    const getSearch = async (search) => {
        setLoader(true);


        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${productPerPage}&search=${search}`);

            navigate(`/products?page=${page}&limit=${productPerPage}&search=${search}`);
            setTotalPages(Math.ceil(data.total / productPerPage));
            setAllProducts(data.products);
            console.log(data);

            if (data.message == 'success') {
                setLoader(false);

            }


        } catch (error) {
            console.error(error);

        }


    };





    const sort = async (sortValue) => {

        setLoader(true);
        if (sortValue) {

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${productPerPage}&sort=${sortValue}`);

                navigate(`/products?page=${page}&limit=${productPerPage}&sort=${sortValue}`);
                setTotalPages(Math.ceil(data.total / productPerPage));
                setAllProducts(data.products);
                console.log(data);

                if (data.message == 'success') {
                    setLoader(false);

                }


            } catch (error) {
                console.error(error);

            }
        }

        else {
            // getAllProducts();
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${productPerPage}`);

                navigate(`/products?page=${page}&limit=${productPerPage}`);
                setTotalPages(Math.ceil(data.total / productPerPage));
                setAllProducts(data.products);
                console.log(data);

                if (data.message == 'success') {
                    setLoader(false);

                }


            } catch (error) {
                console.error(error);

            }
        }
    }








    // const getAllProducts = async () => {
    //     setLoader(true);
    //     try {
    //         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${productPerPage}`);

    //         navigate(`/products?page=${page}&limit=${productPerPage}`);
    //         setTotalPages(Math.ceil(data.total / productPerPage));
    //         setAllProducts(data.products);
    //         console.log(data);

    //         if (data.message == 'success') {
    //             setLoader(false);

    //         }


    //     } catch (error) {
    //         console.error(error);

    //     }



    // };

    useEffect(() => {
        setLoader(true);
        // getAllProducts();
        sort(sortValue);
        getSearch(search);
        getMinMax({ min, max });

    }, [page]);

    if (loader) {
        return <Loader/>
    }


    return (
        <div className='all-products py-5'>
            <div className='container '>
                <h2 className='text-center text-decoration-underline'> Categories</h2>
                <Categories />
                <div className='product-items pb-5 py-5'>
                    <h2 className='text-center text-decoration-underline pb-5'> All Products</h2>
                    <div className='row py-5'>
                        <div className='sort  col-md-2'>
                            <select className="form-select bg-danger" onChange={handleSelectedOption} >
                                {sortOptions.map((option, index) =>
                                    <option key={index} value={option.value} >{option.lable}</option>
                                )}
                            </select>
                        </div>

                        <div className='search col-md-4 '>
                            <form className='d-flex' onSubmit={() => getSearch(search)}>
                                <div className="mb-3 pe-3">
                                    <input type="text" className="form-control" name='search' id="search" placeholder='type to search' onChange={handleSearch} />
                                </div>
                                <button type="submit" className="btn btn-danger" style={{ height: '37px' }}>Search</button>
                            </form>

                        </div>

                        <div className='min-max col-md-4 '>
                            <form className='d-flex' onSubmit={() => getMinMax({ min, max })}>
                                <div className="mb-3 pe-3">
                                    <input type="text" className="form-control" name='min' id="min" placeholder='min price' onChange={handleMinVlaue} />
                                </div>
                                <div className="mb-3 pe-3">
                                    <input type="text" className="form-control" name='max' id="max" placeholder='max price' onChange={handleMaxValue} />
                                </div>
                                <button type="submit" className="btn btn-danger" style={{ height: '37px' }}>get</button>
                            </form>

                        </div>
                    </div>


                    <div className="row row-gap-3">
                        {
                            allProducts.length ? allProducts.map((product) =>
                                <div className='col-md-3 product' key={product._id}>
                                    <div className="card" style={{ height: '500px' }}>
                                        <div className='pb-3'>
                                            <img src={product.mainImage.secure_url} className="card-img-top" style={{ height: '300px', width: 'revert-layer' }} />
                                        </div>
                                        <div className="card-body">
                                            <div >
                                                <h5 className="card-title">{product.name}</h5>
                                            </div>
                                            <div className='rating'>
                                                {
                                                    Array.from({ length: Math.floor(product.avgRating) }, (_, index) => (
                                                        <svg key={index}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height={16}
                                                            width={18}
                                                            viewBox="0 0 576 512">
                                                            <path
                                                                fill='#ffd43b'
                                                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                                                            />
                                                        </svg>
                                                    ))
                                                }
                                                {
                                                    (Math.floor(product.avgRating) >= 0 && Math.floor(product.avgRating) < 5) ?
                                                        Array.from({ length: (5 - Math.floor(product.avgRating)) }, (_, index) => (
                                                            <svg
                                                                key={index}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                height="16"
                                                                width="18"
                                                                viewBox="0 0 576 512">
                                                                <path
                                                                    fill='#ffd43b'
                                                                    d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                                                                />
                                                            </svg>
                                                        )) : null
                                                }
                                            </div>
                                            <div >
                                                <span className="card-title price py-1">price : </span>
                                                {product.price == product.finalPrice ? <span className="card-title price py-1 mx-2">{product.price}$</span>
                                                    :
                                                    <>
                                                        <span className="card-title price py-1 text-decoration-line-through text-danger">{product.price}$</span>
                                                        <span className="card-title price py-1 mx-2">{product.finalPrice}$</span>
                                                        <svg
                                                            version="1.1"
                                                            id="_x34_"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            viewBox="0 0 512 512"
                                                            xmlSpace="preserve"
                                                            width="60px"
                                                            height="60px"
                                                            fill="#000000"
                                                            style={{
                                                                right: '-3px',
                                                                top: '0px',
                                                                position: 'absolute',
                                                            }}
                                                        >
                                                            <g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path style={{ fill: 'none' }} d="M445.769,111.232c1.139-1.366,2.354-2.884,3.492-4.404c-1.139,1.52-2.278,3.038-3.417,4.404 l-0.076,0.076V111.232z" /> <path style={{ fill: 'none' }} d="M470.141,28.473L428.534,70.08c-5.012-0.608-11.541-1.518-19.058-2.582 c0.759-2.2,1.595-4.403,2.506-6.681c12.452-30.523,32.041-47,44.189-47c1.594,0,3.113,0.304,4.404,0.836 C464.978,16.399,468.319,21.336,470.141,28.473z" /> <path style={{ fill: 'none' }} d="M389.887,107.208c0.076,0.456,0.076,0.912,0.152,1.366l-11.237,11.239 c-1.519-5.923,0.076-12.453,4.783-17.16c0.911-0.912,1.822-1.672,2.885-2.43c0.987-0.684,2.126-1.214,3.189-1.67 C389.583,101.513,389.659,104.399,389.887,107.208z" /> <path style={{ fill: 'none' }} d="M399.378,133.48v0.074c-2.733,0.456-5.543,0.228-8.124-0.606c2.582,0.834,5.391,0.986,8.049,0.532 H399.378z" /> <path style={{ fill: '#F8F1C3' }} d="M422.915,142.211v0.076h-0.076l-5.847,5.846l-1.594,1.518c-0.684,0.532-1.367,1.064-2.05,1.518 c-0.684,0.456-1.367,0.836-2.05,1.214c-1.367,0.684-2.809,1.292-4.252,1.672c-4.328,1.29-9.035,1.29-13.439,0 c-1.443-0.38-2.885-0.988-4.252-1.672c-0.683-0.378-1.367-0.758-1.974-1.214c-1.291-0.836-2.582-1.898-3.721-3.036l-16.552-16.551 h-0.076l-3.265-3.342c-9.187-9.111-9.187-24.144,0-33.331l29.612-29.611c0.684,0.15,1.443,0.226,2.202,0.302v0.076 c-3.644,11.313-5.694,22.55-5.922,32.877c-1.063,0.456-2.202,0.986-3.189,1.67c-1.063,0.684-1.974,1.442-2.885,2.354v0.076 c-4.707,4.707-6.302,11.237-4.783,17.16c0.683,3.188,2.354,6.149,4.783,8.579c2.202,2.202,4.859,3.72,7.668,4.556 c2.582,0.834,5.391,0.986,8.049,0.532h0.076v0.074h0.076c0.684,0.76,1.367,1.52,2.126,2.202c0.759,0.684,1.519,1.29,2.354,1.898 c0.835,0.608,1.67,1.216,2.581,1.672c0.836,0.53,1.822,0.986,2.734,1.366c0.759,0.302,1.518,0.606,2.354,0.834 c1.518,0.456,3.189,0.76,4.784,0.912c0.835,0,1.67,0.076,2.505,0.076C420.257,142.515,421.548,142.439,422.915,142.211z" /> <path style={{ fill: '#F8F1C3' }} d="M351.831,140.221l19.92,19.92c9.165,9.165,24.163,9.165,33.328,0l17.889-17.889l0,0l-5.941,5.941 c-9.165,9.165-24.163,9.165-33.328,0l-19.92-19.92c-9.165-9.165-9.165-24.162-0.001-33.327l-11.947,11.947 C342.665,116.058,342.665,131.056,351.831,140.221z" /> <path style={{ fill: '#816D5E' }} d="M475.912,86.86c-6.15,15.261-14.502,28.321-23.765,37.887c-1.291,1.442-2.657,2.808-4.024,4.024 c-0.076,0.076-0.076,0.076-0.152,0.152c-0.456-3.568-0.911-6.985-1.367-10.327v-0.076c-0.304-2.428-0.608-4.706-0.911-7.061 c0.076-0.076,0.076-0.076,0.076-0.152l0.076-0.076c1.139-1.366,2.278-2.808,3.417-4.404c1.139-1.518,2.278-3.188,3.417-4.934 c0.759-1.214,1.519-2.428,2.354-3.796c0.608-1.062,1.291-2.202,1.974-3.416c0-0.152,0.152-0.304,0.228-0.532 c2.05-3.796,4.024-7.971,5.846-12.451c8.656-21.336,10.174-40.698,7.061-53.225c-1.822-7.137-5.163-12.073-9.567-13.819 c-1.291-0.532-2.809-0.836-4.404-0.836c-12.148,0-31.737,16.477-44.189,47c-0.911,2.278-1.747,4.48-2.506,6.681 c-2.202-0.228-4.404-0.532-6.758-0.91c-2.278-0.304-4.707-0.684-7.137-0.988c1.063-3.34,2.278-6.681,3.569-9.945 C412.513,22.854,435.974,0,456.171,0c1.594,0,3.189,0.152,4.632,0.378c1.746,0.304,3.417,0.76,5.011,1.444 c6.682,2.734,11.845,8.199,15.185,15.792c0.683,1.52,1.215,3.038,1.747,4.708c1.215,3.872,2.05,8.277,2.43,12.983 C486.466,50.795,483.201,69.094,475.912,86.86z" /> <path style={{ fill: '#705F51' }} d="M411.374,125.961c-0.607,0.836-1.215,1.672-2.05,2.43c-2.733,2.734-6.074,4.404-9.566,5.088 c-0.076,0-0.228,0.074-0.304,0.074h-0.076l-0.076-0.074c-0.152-0.152-0.228-0.304-0.304-0.456c-1.139-1.368-2.126-2.81-3.037-4.48 c-0.531-0.836-0.987-1.822-1.443-2.734c-0.456-0.986-0.911-1.972-1.291-3.036c-0.379-1.062-0.759-2.126-1.063-3.264 c-0.304-1.062-0.608-2.202-0.912-3.416c-0.228-1.216-0.456-2.43-0.683-3.644c-0.228-1.292-0.38-2.582-0.532-3.874 c-0.076-0.454-0.076-0.91-0.152-1.366c-0.228-2.808-0.303-5.695-0.228-8.655c2.202-0.836,4.479-1.29,6.758-1.29 c0.683,0,1.443,0.074,2.126,0.152c0.76,0.074,1.443,0.226,2.202,0.454c0.38,0,0.684,0.076,0.987,0.228 c0.607,0.152,1.139,0.38,1.747,0.608c0,2.506,0,5.01,0.228,7.365C404.465,115.408,407.198,122.393,411.374,125.961z" /> <path style={{ fill: '#ECE5BB' }} d="M446.604,118.521v0.076l-23.613,23.614v0.076h-0.152c-1.291,0.152-2.657,0.304-3.948,0.304 c-0.835,0-1.67-0.076-2.505-0.152c-1.595-0.152-3.265-0.456-4.784-0.912c-0.835-0.228-1.595-0.532-2.354-0.834 c-0.911-0.38-1.898-0.836-2.734-1.366c-0.911-0.456-1.746-1.064-2.581-1.672c-0.835-0.608-1.595-1.214-2.354-1.898 c-0.835-0.682-1.519-1.442-2.202-2.202h0.076c0.076,0,0.228-0.074,0.304-0.074c3.492-0.684,6.833-2.354,9.566-5.088 c0.835-0.758,1.443-1.594,2.05-2.43c5.012-7.137,4.328-17.006-2.05-23.308c-1.67-1.746-3.72-3.114-5.846-3.948 c0-1.216,0.076-2.43,0.152-3.72c0.608-8.657,2.582-17.995,5.847-27.486c7.517,1.064,14.046,1.974,19.058,2.582 c7.365,1.062,11.693,1.67,11.693,1.67s2.278,16.399,5.467,39.71C445.997,113.814,446.3,116.092,446.604,118.521z" /> <path style={{ fill: '#705F51' }} d="M403.501,98.688c0.222-9.668,2.283-20.367,6.005-31.164c-4.34-0.588-9.019-1.218-13.962-1.875 c-3.645,11.318-5.651,22.578-5.875,32.929C394.103,96.804,399.09,96.842,403.501,98.688z" /> <path style={{ fill: '#C24443' }} d="M459.891,268.883L228.618,500.156c-11.085,11.085-27.106,14.425-41.152,9.869 c-5.923-1.898-11.541-5.163-16.248-9.869L11.771,340.709c-4.631-4.708-7.896-10.251-9.794-16.173 c-4.556-13.971-1.215-30.067,9.794-41.152L243.044,52.111c5.087-5.088,93.618,5.771,150.335,13.211l-29.612,29.611l-11.92,11.997 c-9.187,9.111-9.187,24.144,0,33.255l19.893,19.97c9.187,9.187,24.145,9.187,33.331,0l17.919-17.92l23.613-23.612 c0.456,3.34,0.911,6.757,1.367,10.325C455.336,185.437,464.675,264.098,459.891,268.883z" /> <rect x="418.07" y="130.429" transform="matrix(0.7071 -0.7071 0.7071 0.7071 35.12 345.6456)" style={{ fill: '#C24443' }} width="33.44" height={0} /> <g> <path style={{ fill: '#FDFEFE' }} d="M196.046,354.654c-1.139-3.264-3.037-6.302-5.846-9.111c-2.657-2.658-5.315-4.632-8.048-5.999 c-2.809-1.292-5.695-1.898-8.656-1.746c-2.505,0-4.935,0.532-7.365,1.518c-2.43,1.064-5.163,2.732-8.2,5.012l-7.972,5.845 c-1.291,0.988-2.506,1.67-3.644,2.126c-0.076,0.076-0.228,0.152-0.304,0.152c-1.215,0.456-2.43,0.76-3.568,0.76 c-1.215,0-2.278-0.228-3.189-0.684c-0.987-0.456-1.823-1.062-2.582-1.822c-1.974-1.974-3.037-4.404-3.037-7.289 c0-2.884,1.519-5.847,4.556-8.883c1.898-1.898,4.176-3.644,6.758-5.316c2.581-1.67,5.618-2.504,9.111-2.58l0.076-14.199 c-4.935,0.076-9.415,1.064-13.363,3.036c-4.024,1.898-8.048,4.86-12.072,8.885c-3.113,3.188-5.543,6.453-7.137,9.795 c-1.595,3.34-2.506,6.681-2.733,9.945c-0.152,3.266,0.304,6.454,1.518,9.491c1.215,3.114,3.189,5.924,5.771,8.505 c1.898,1.898,3.872,3.416,5.847,4.556c3.113,1.898,6.378,2.732,9.643,2.656c2.581,0,5.163-0.532,7.744-1.594 c2.506-0.988,5.315-2.582,8.276-4.784l7.972-5.845c1.67-1.292,3.037-2.126,4.024-2.582c0.987-0.38,1.974-0.608,3.113-0.682 c2.43,0,4.631,0.986,6.606,2.96c2.354,2.352,3.265,5.01,2.809,7.973c-0.532,3.036-2.506,6.225-5.847,9.643 c-2.657,2.656-5.542,4.783-8.655,6.453c-3.113,1.746-6.454,2.582-10.174,2.582v14.577c5.695,0.076,10.857-1.062,15.413-3.416 c4.479-2.278,8.959-5.695,13.363-10.023c3.037-3.036,5.467-6.302,7.365-9.719c1.822-3.416,2.961-6.833,3.417-10.249 C197.412,361.182,197.109,357.842,196.046,354.654z" /> <path style={{ fill: '#FDFEFE' }} d="M214.04,284.574l-30.447-14.123l-8.883,8.885l14.198,30.371l22.626,48.592l11.769-11.769 l-6.682-13.741l20.5-20.578l13.667,6.834l11.845-11.845L214.04,284.574z M210.244,320.107l-10.326-21.412l-3.417-6.985 l6.985,3.416l21.184,10.555L210.244,320.107z" /> <path style={{ fill: '#FDFEFE' }} d="M297.256,252.457l-26.271,26.27l-47.834-47.834l-11.313,11.313l22.322,22.248l35.609,35.609 l37.508-37.507L297.256,252.457z" /> <path style={{ fill: '#FDFEFE' }} d="M344.559,205.154l-26.878,26.801l-14.047-14.045l22.854-22.854l-10.098-10.099l-22.854,22.854 l-1.367-1.366l-12.148-12.223l26.802-26.804l-10.098-10.097l-38.115,38.115l22.246,22.322l35.61,35.609l38.115-38.191 L344.559,205.154z" /> </g> </g> <path style={{ opacity: '0.06', fill: '#040000' }} d="M423.143,141.983l-0.152,0.228l23.613-23.614L423.143,141.983z M422.915,142.211v0.076 h0.076v-0.076H422.915z M422.839,142.287l-5.847,5.846v0.076l5.923-5.923H422.839z M422.839,142.287l-5.847,5.846v0.076 l5.923-5.923H422.839z M485.327,35.077c-0.38-4.707-1.215-9.111-2.43-12.983c-0.532-1.67-1.215-3.036-1.822-4.555l-10.934,10.933 c3.113,12.527,1.595,31.889-7.061,53.225c-1.822,4.48-3.796,8.655-5.846,12.451c-0.076,0.228-0.228,0.38-0.228,0.532 c-0.684,1.214-1.367,2.354-1.974,3.416c-0.835,1.368-1.595,2.582-2.354,3.796c-1.139,1.746-2.278,3.34-3.417,4.934 c-0.531,0.76-1.139,1.52-1.746,2.278c-0.532,0.684-1.063,1.444-1.671,2.126c0.152,0.836,0.228,1.67,0.304,2.582 c-0.152-0.836-0.304-1.67-0.379-2.506c0,0.076,0,0.076-0.076,0.152c-3.189-23.31-5.467-39.71-5.467-39.71s-4.328-0.608-11.693-1.67 l-38.495,38.494c0.152,1.292,0.304,2.582,0.532,3.874c0.228,1.214,0.456,2.428,0.683,3.644c0.304,1.214,0.608,2.354,0.912,3.416 c0.303,1.138,0.683,2.202,1.063,3.264c0.38,1.064,0.836,2.05,1.291,3.036c0.456,0.912,0.911,1.898,1.443,2.734 c0.911,1.67,1.898,3.112,3.037,4.48c0.076,0.152,0.152,0.304,0.304,0.456c-2.658,0.454-5.467,0.302-8.049-0.532 c-2.809-0.836-5.466-2.354-7.668-4.556c-2.43-2.43-4.1-5.391-4.783-8.579l-11.693,11.769h-0.076l-11.921,11.919l-62.944,62.944 l-11.313,11.313l-35.382,35.459l-11.313,11.237l-20.121,20.12l-10.554,10.553l-3.568,3.568l-11.009,11.011L146.314,352.3 l-14.35,14.351l-46.923,46.922l86.329,86.328c4.707,4.708,10.326,7.973,16.248,9.871c14.046,4.556,30.067,1.214,41.152-9.871 l231.121-231.045l0.152-0.228c0.152-0.152,0.38-0.53,0.456-0.91c0.076-0.304,0.152-0.608,0.228-0.988 c0.076-0.456,0.152-0.986,0.228-1.518c2.05-16.476-6.226-85.57-12.832-136.44v-0.076c0.683-0.608,1.367-1.214,2.05-1.898 c0.684-0.608,1.291-1.366,1.974-2.05c9.263-9.567,17.615-22.626,23.765-37.887c0.076-0.076,0.152-0.152,0.152-0.228 C483.353,68.864,486.618,50.567,485.327,35.077z M409.324,102.653c6.378,6.303,7.062,16.172,2.05,23.308 c-4.176-3.568-6.909-10.553-7.669-19.892c-0.228-2.354-0.228-4.859-0.228-7.365C405.604,99.539,407.654,100.907,409.324,102.653z M416.158,149.044l-10.934,10.859l10.022-10.099l0.152-0.152l1.594-1.518l0.152-0.228l5.695-5.618l-5.847,5.846v0.076 L416.158,149.044z M422.839,142.287l-5.847,5.846v0.076l5.923-5.923H422.839z M422.915,142.211v0.076h0.076v-0.076H422.915z" /> </g> </g></svg>

                                                    </>}

                                            </div>
                                            <div className='position-absolute' style={{ bottom: '15px' }}>
                                                <Link to={`/product/${product._id}`} className="btn btn-outline-danger">Details</Link></div>
                                        </div>
                                    </div>

                                </div>
                            ) : <h2>no product</h2>
                        }
                    </div>
                </div>

                <div className='justify-content-center d-flex'>
                    <nav aria-label="Page navigation example ">
                        <ul className="pagination">
                            <li className="page-item"><Link className="page-link bg-danger text-white" onClick={() => prevPage()}>Previous</Link></li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className="page-item"><Link className="page-link bg-secondary text-white" onClick={() => pageClicked(index + 1)} >{index + 1}</Link></li>

                            ))}
                            <li className="page-item "><Link className="page-link bg-danger text-white" onClick={() => nextPage()}  >Next</Link></li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>
    );
};

