import './loading.css'


export function Loading() {

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
                <img src="/images/loder.png" className="w-25 h-25 mb-3 object-fit-contain" alt="Loader" />
                <div className='d-flex align-items-center'>
                    <div>Please Wait </div>
                    &nbsp;&nbsp;
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>



        </>
    )

}