import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from "react-share";

const ProductShare = ({ product }) => {
    const shareUrl = window.location.href;
    const title = product.title;

    return (
        <div className="flex gap-3 items-center">
            <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
        </div>
    );
};

export default ProductShare;