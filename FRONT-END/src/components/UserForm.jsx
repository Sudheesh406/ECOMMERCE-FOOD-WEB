
function UserForm() {
  return (
    <div><form className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="profileImage" className="text-sm font-medium text-gray-700">Profile Image</label>
      <input type="file" id="profileImage" className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="inputName" className="text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="inputName" placeholder="Name" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div className="flex flex-col">
        <label htmlFor="inputEmail" className="text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="inputEmail" placeholder="Email" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="inputAddress" className="text-sm font-medium text-gray-700">Address</label>
      <input type="text" id="inputAddress" placeholder="1234 Main St" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="inputPhone1" className="text-sm font-medium text-gray-700">Phone Number 1</label>
        <input type="tel" id="inputPhone1" placeholder="Phone Number 1" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div className="flex flex-col">
        <label htmlFor="inputPhone2" className="text-sm font-medium text-gray-700">Phone Number 2</label>
        <input type="tel" id="inputPhone2" placeholder="Phone Number 2" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="inputGender" className="text-sm font-medium text-gray-700">Gender</label>
      <select id="inputGender" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        <option selected>Choose...</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label htmlFor="inputPin" className="text-sm font-medium text-gray-700">Pin Number</label>
        <input type="text" id="inputPin" placeholder="Pin Number" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div className="flex flex-col">
        <label htmlFor="inputCity" className="text-sm font-medium text-gray-700">City</label>
        <input type="text" id="inputCity" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
    </div>
    
    <div className="flex flex-col">
      <label htmlFor="inputState" className="text-sm font-medium text-gray-700">State</label>
      <select id="inputState" className="mt-1 block w-full text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    
    <button type="submit" className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
  </form>
  </div>
  )
}

export default UserForm