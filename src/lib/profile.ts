import { Session } from "next-auth";

export const renderTwitterUsername = (user: Session["user"]) => {
  if (!user?.twitterUrl) return "Not Set";
  const username = user.twitterUrl.split("/").pop();
  return (
    <>
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.901 1.15391H21.393L14.07 9.38091L22.84 22.8399H15.93L10.978 15.6599L4.99201 22.8399H2.5L10.375 13.4359L1.93901 1.15391H9.08801L13.882 7.50291L18.901 1.15391ZM16.711 20.6589H18.236L7.75301 3.32391H6.12601L16.711 20.6589Z"
            fill="currentColor"
          />
        </svg>
        <a
          href={user.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          @{username}
        </a>
      </div>
    </>
  );
};
