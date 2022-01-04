
export default function NotificationToast({title, body}) {
  return <div className="bg-white mb-4 p-8 rounded-3xl">
    <h3 className="font-bold">{title}</h3>
    <p>{body}</p>
  </div>
}
