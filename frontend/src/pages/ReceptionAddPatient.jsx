import ReceptionSidebar from '../components/reception/ReceptionSidebar'
import ReceptionNavbar from '../components/reception/ReceptionNavbar'
import AddPatientForm from '../components/reception/AddPatientForm'

export default function ReceptionAddPatient() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <ReceptionSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <ReceptionNavbar title="Register New Patient" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-800">Register New Patient</h2>
            <p className="text-sm text-slate-400 mt-1">Fill in the form below to add a patient to the system.</p>
          </div>
          <AddPatientForm />
        </main>
      </div>
    </div>
  )
}
