/**
 * @component VideoCallScheduler
 * @description Schedule video call for jewelry consultation
 */
import { Video, Calendar, Clock, Shield } from 'lucide-react';

const VideoCallScheduler = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Image Side */}
            <div className="relative h-full min-h-[400px] overflow-hidden">
              <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img
                src="https://cdn.caratlane.com/media/static/images/web/Homepagetryathome-1.png"
                alt="Video Call Consultation"
                className="w-full h-full object-cover animated fadeIn"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <p className="text-white text-xl md:text-2xl font-bold leading-tight">
                  View Designs on<br />Live Video Call
                </p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                    <Video className="w-4 h-4 text-purple-700" />
                    <span className="text-sm font-semibold text-purple-900">VIRTUAL CONSULTATION</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                    Personal Shopping Experience
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Shop from the comfort of your home with our expert jewelry consultants
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Live Video Call</h4>
                      <p className="text-sm text-gray-600">See products in real-time with HD video</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Book Anytime</h4>
                      <p className="text-sm text-gray-600">Flexible slots from 10 AM to 8 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Expert Guidance</h4>
                      <p className="text-sm text-gray-600">Get personalized recommendations</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">30-Minute Session</h4>
                      <p className="text-sm text-gray-600">Dedicated time for your queries</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all font-semibold text-lg flex items-center justify-center gap-2 group">
                  <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>SCHEDULE A VIDEO CALL</span>
                </button>

                <p className="text-center text-sm text-gray-500">
                  Available for Gold, Diamond & Gemstone jewelry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCallScheduler;
