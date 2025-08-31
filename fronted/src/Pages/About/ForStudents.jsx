import React from "react";
import {
  Users,
  ClipboardList,
  ShieldCheck,
  Wallet,
  MessageSquare,
} from "lucide-react";
import students from '../../assets/Studnet.jpg'

const ForStudents = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            For <span className="text-yellow-500">Students</span>
          </h2>

          <div className="space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Connect With Tutors
                </h3>
                <p className="text-gray-600 mt-2">
                  At eTutors.pk, you will connect with verified home/online tutors
                  that exactly match your learning and geographic requirements.
                  Our portal helps you find the most suitable tutor quickly.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <ClipboardList className="w-8 h-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Hassle Free Process
                </h3>
                <p className="text-gray-600 mt-2">
                  Choose your tutor, click "Hire This Tutor," select the subject,
                  and send your request. We’ll handle the rest and connect you
                  both seamlessly.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-600 mt-2">
                  Each tutor undergoes a rigorous screening process to earn a
                  verified badge. We check all identity and educational
                  documents before approval.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <Wallet className="w-8 h-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  No Service Charges
                </h3>
                <p className="text-gray-600 mt-2">
                  Free registration, no hidden charges! We don’t take any fee
                  from students for using our platform.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-start gap-4">
              <MessageSquare className="w-8 h-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Forum Access
                </h3>
                <p className="text-gray-600 mt-2">
                  eTutors.pk offers a dedicated Q&A forum where students can ask
                  any educational questions. Tutors are always ready to guide
                  you, plus access to a huge collection of resources.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={students} // apni image ka path lagao
            alt="For Students"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ForStudents;
