function StatCard({title , value , change}) {
    return(
        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transaction">
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <h2 className="text-3xl font-bold mt-2">{value}</h2>
            <p className="text-green-500 text-sm mt-2">{change}</p>
        </div>
    )
}

export default StatCard;