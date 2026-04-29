function RecentActivity() {
    const activities  =[
    "Ahmed completed UI redesign task",
    "Sara added new marketing campaign",
    "Project Alpha moved to review stage",
    "New team member joined development team",
    ]

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">  Recent Activity </h2>

            <ul className="space-y-4">
                {activities.map((activity , index) => (
                    <li key={index} className="pb-3 border-b last:border-none text-gray-700">
                        {activities}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default RecentActivity;