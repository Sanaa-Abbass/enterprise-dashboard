function RecentActivity() {
    const activities  =[
    "Ahmed completed UI redesign task",
    "Sara added new marketing campaign",
    "Project Alpha moved to review stage",
    "New team member joined development team",
    ]

    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">  Recent Activity </h2>

            <ul className="space-y-4">
                {activities.map((activity , index) => (
                    <li key={index} className="text-gray-200 border-b pb-2">
                        {activities}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default RecentActivity;