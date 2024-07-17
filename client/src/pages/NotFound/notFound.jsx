export default function NotFound() {
    return (
        <>
            <div className="vh-100 vw-100 text-black d-flex justify-content-center align-items-center" style={{
                borderRadius: '0.25rem',
                backgroundImage: 'url(/images/dummy.jpeg)',
                objectFit: "cover",
                backgroundPosition: 'center ',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className="fw-bold">
                    <h2 className="fw-bolder display-4">404 Not Found</h2>
                    <div>The Page Doesn't Exists</div>
                </div>
            </div>
        </>
    )
}