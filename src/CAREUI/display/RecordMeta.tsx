import moment from "moment";
import CareIcon from "../icons/CareIcon";

interface Props {
  time?: string;
  prefix?: React.ReactNode;
  className?: string;
  user?: {
    first_name: string;
    last_name: string;
    last_login?: string;
  };
}

/**
 * A generic component to display relative time along with a tooltip and a user
 * if provided.
 */
const RecordMeta = ({ time, user, prefix, className }: Props) => {
  const relativeTime = moment(time).fromNow();

  const isOnline =
    user?.last_login &&
    moment().subtract(5, "minutes").isBefore(user.last_login);

  let child = (
    <div className="tooltip">
      <span className="underline">{relativeTime}</span>
      <span className="flex gap-1 tooltip-text font-medium tracking-wider text-xs -translate-x-1/3">
        {moment(time).format("hh:mm A; DD/MM/YYYY")}
        {user && (
          <>
            <CareIcon className="care-l-user" />
            {user.first_name} {user.last_name}
            {isOnline && (
              <div className="rounded-full w-1 h-1 bg-primary-500" />
            )}
          </>
        )}
      </span>
    </div>
  );

  if (prefix || user) {
    child = (
      <div className="flex items-center gap-1">
        {prefix}
        {child}
        {user && <CareIcon className="care-l-user" />}
      </div>
    );
  }

  return <div className={className}>{child}</div>;
};

export default RecordMeta;
