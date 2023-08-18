import "./loadingStyle.css"

const LoadingSpinner = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="spinner-container">
                    <div className="spinner">
                        <div className="spinner">
                            <div className="spinner">
                                <div className="spinner">
                                    <div className="spinner">
                                        <div className="spinner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingSpinner