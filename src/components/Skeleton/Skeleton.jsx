import ContentLoader from "react-content-loader";

export const Skeleton = (props) => (
    <ContentLoader
        className="skeleton"
        speed={2}
        width={285}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f0f0f0"
        foregroundColor="#fffafa"
        {...props}
    >
        <rect x="-3" y="500" rx="0" ry="0" width="170" height="25" />
        <circle cx="135" cy="125" r="125" />
        <rect x="0" y="265" rx="8" ry="8" width="280" height="27" />
        <rect x="0" y="315" rx="8" ry="8" width="280" height="91" />
        <rect x="0" y="424" rx="8" ry="8" width="90" height="40" />
        <rect x="114" y="420" rx="8" ry="8" width="165" height="45" />
    </ContentLoader>
);
