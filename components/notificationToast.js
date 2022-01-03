
export default function NotificationToast({title, body}) {
  return <div className="bg-white mb-4 max-w-xs p-8 rounded-3xl my-4">
    <h3 className="font-bold">{title}</h3>
    <p>{body}</p>
  </div>
}
