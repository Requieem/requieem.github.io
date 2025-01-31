function LogoLink({url, image, classes, alt}) {
    return (
        <a href={url} target="_blank">
            <img src={image} className={classes} alt={alt} />
        </a>
    );
}

export default LogoLink;