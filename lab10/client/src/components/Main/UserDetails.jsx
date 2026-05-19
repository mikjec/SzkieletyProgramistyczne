function UserDetails({ user }) {
	return (
		<div>
			<p>
				{user.firstName} {user.lastName}
			</p>
			<p>Email: {user.email}</p>
			<p>id: {user._id}</p>
		</div>
	)
}

export default UserDetails
