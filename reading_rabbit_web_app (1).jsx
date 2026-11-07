import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Trash2, 
  Star, 
  Award, 
  Sparkles, 
  UserCheck, 
  Volume2, 
  CheckCircle2, 
  RefreshCw, 
  Smile, 
  BookOpen, 
  ChevronRight, 
  Search,
  Filter,
  Heart
} from 'lucide-react';

// Data Structures
const STUDENTS_DATA = {
  1: [
    "Aljory Hilal", "Yazen Abdullah", "Mohammed Hamed", "Aljory Yousuf",
    "Zakria Adnan", "Sultan Ali", "Rashid Ahmed", "Anwar Mohammed",
    "Alwaleed Fayez", "Mohammed Hamad", "Noor Mohammed", "Alhwari Abdulaziz"
  ],
  2: [
    "Nerjes Saif", "Ibrahim Mohammed", "Ghanim Jameel", "Shamaa Ahmed",
    "Mohammed Khalid", "Sultan Omar", "Wafa Nawaf", "Hamza Mohammed",
    "Razan Hamad", "Amna Abdullah"
  ],
  3: [
    "Shikhaa Huthaifa", "Meera Hamad", "Razan Hamad", "Alyman Hussain",
    "Dhey Khalil", "Ziad Louay", "Abdullah Ishaq", "Abdullah Salim",
    "Almohra Majid"
  ]
};

const PASSAGES_DATA = [
  // LEVEL 1
  {
    id: "l1_u1_t1",
    level: 1,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.1: My Busy Day",
    text: "I get up in the morning. I have breakfast with my family. I go to school in the morning. I have art lessons at school. I go home in the afternoon. I do my homework in the afternoon. I go to bed at night."
  },
  {
    id: "l1_u1_t2",
    level: 1,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.2: A Happy School Day",
    text: "It's a happy, happy day! I go to school today. I have breakfast in the morning. We have art lessons at school. We have lunch in the afternoon. We play in the evening."
  },
  {
    id: "l1_u2_t1",
    level: 1,
    unit: "Unit 2: Let's dress up!",
    title: "Text 2.1: Our School Show Clothes",
    text: "It's the school show today. We're wearing cool clothes. We're wearing jeans, shirts and coats. You're wearing a tracksuit, trainers and a baseball cap. They're wearing pyjamas, socks and slippers. We look amazing!"
  },
  {
    id: "l1_u2_t2",
    level: 1,
    unit: "Unit 2: Let's dress up!",
    title: "Text 2.2: My Possessions",
    text: "Look at my things! This is my backpack. My computer is grey. My glasses are blue. My handbag is red. My keys are yellow. My phone is green. I like my things!"
  },
  {
    id: "l1_u3_t1",
    level: 1,
    unit: "Unit 3: Hobbies",
    title: "Text 3.1: My Weekly Hobbies",
    text: "I do a lot of things every week! I play tennis on Mondays. I don't play basketball on Mondays. I play basketball at the weekend. My friend skateboards on Tuesdays. She doesn't roller-skate on Tuesdays, but she roller-skates on Thursdays."
  },
  {
    id: "l1_u3_t2",
    level: 1,
    unit: "Unit 3: Hobbies",
    title: "Text 3.2: My Friend Mohammed",
    text: "This is my cousin, Mohammed. He doesn't roller-skate on Saturdays. He always skateboards in the morning. He doesn't do karate. In the afternoon, he often watches TV. He never goes to school on Saturdays. He likes Saturdays!"
  },
  {
    id: "l1_u4_t1",
    level: 1,
    unit: "Unit 4: I want to be a doctor!",
    title: "Text 4.1: My Family and Jobs",
    text: "My family is cool! My grandma is a chef. She goes to work by car. My uncle is an artist. He goes to work by bus. My brother is a firefighter. He goes to work by motorbike. I want to be a pilot!"
  },
  {
    id: "l1_u4_t2",
    level: 1,
    unit: "Unit 4: I want to be a doctor!",
    title: "Text 4.2: Going to the Beach",
    text: "Today is a special beach day. I go to the beach with Mum. We want to go by train, but the train stops. Then we get on a bus, but the bus stops, too. Finally, we get on a boat. The boat goes fast on the water, and we get to the sunny beach!"
  },

  // LEVEL 2
  {
    id: "l2_u1_t3",
    level: 2,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.3: Jasim and Yasir's Day",
    text: "We're Jasim and Yasir, We're brothers. We have art lessons at school in the morning. We have lunch in the afternoon. We don't play in the afternoon. We do homework. We have dinner in the evening. We play in the evening, too. We go to bed at night."
  },
  {
    id: "l2_u1_t4",
    level: 2,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.4: Robot School",
    text: "Welcome to Robot School! We go to school at eight o'clock. It's half past eight. We have English lessons in the morning. We say the alphabet. It's half past twelve. It's time for lunch. We have fish, rice and vegetables. We have water, too."
  },
  {
    id: "l2_u2_t3",
    level: 2,
    unit: "Unit 2: Let's dress up!",
    title: "Text 2.3: A Birthday Party in the Park",
    text: "It's our birthday today. We're in the park with our family. It's hot and sunny. We're wearing dishdashas, hats and sandals. Our mum and our sister are wearing hijabs, shoes and dresses. Their hijabs are blue. Our dad is wearing a dishdasha, a hat and sandals, too."
  },
  {
    id: "l2_u2_t4",
    level: 2,
    unit: "Unit 2: Let's dress up!",
    title: "Text 2.4: Eid Al-Fitr in Oman",
    text: "Eid Al-Fitr is a special day in Oman. People celebrate for the first three days of Shawwal. Families eat special food and give presents, sweets and Eidiya to their children. Some children wear traditional clothes. It is a wonderful festival after Ramadan."
  },
  {
    id: "l2_u3_t3",
    level: 2,
    unit: "Unit 3: Hobbies",
    title: "Text 3.3: Camel and Dhow Racing in Oman",
    text: "Camel racing is an exciting traditional sport in Oman. The camels can run at about 64 kilometres an hour. Dhow racing is another popular traditional sport. In dhow racing, people race on traditional sailing boats called dhows. Many people come to watch and race these beautiful boats."
  },
  {
    id: "l2_u3_t4",
    level: 2,
    unit: "Unit 3: Hobbies",
    title: "Text 3.4: Maryam and Badriya at the Park",
    text: "Maryam and Badriya are good friends. They always go to the park at the weekend with their families. On Friday, Maryam has got a basketball. Badriya has got a tennis racket and a tennis ball. Maryam plays basketball and Badriya plays tennis. Maryam's basketball goes up and goes in a big tree!"
  },
  {
    id: "l2_u4_t3",
    level: 2,
    unit: "Unit 4: I want to be a doctor!",
    title: "Text 4.3: School Buses in the United States",
    text: "Many students in the United States go to school by school bus. All school buses in the United States are yellow. Cars must stop for school buses. Bus drivers take the students to school in the morning and take them home in the afternoon. Students think going to school by bus is fun."
  },
  {
    id: "l2_u4_t4",
    level: 2,
    unit: "Unit 4: I want to be a doctor!",
    title: "Text 4.4: Jobs Day at School",
    text: "It's Jobs Day at school. All the children are wearing special clothes for their favourite jobs. Noora is wearing a blue hat and jacket. Hamed is wearing a white hat and jacket with some bread. Qais is standing next to the board in his school clothes. He doesn't wear special clothes because he wants to be a teacher."
  },

  // LEVEL 3
  {
    id: "l3_u1_t5",
    level: 3,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.5: Helpers Team at School",
    text: "Lily, Fatma, Sami and Jack go to school today. They have art lessons in the morning. Jack and Sami play tennis in the park before school. Atomic and Polly are on the table. Blue and yellow make green. They paint Atomic, and Atomic becomes colourful!"
  },
  {
    id: "l3_u1_t6",
    level: 3,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.6: Breakfast Around the World",
    text: "Breakfasts are different around the world. In the UK, some people have toast and tea. Children often have cereal, milk and juice. In South Africa, people have corn porridge with sugar and milk. In Japan, some people eat a big breakfast with fish, pickles, vegetables, rice and soup. In Oman, Khubz Rakhal is a popular breakfast dish with eggs and beans."
  },
  {
    id: "l3_u1_t7",
    level: 3,
    unit: "Unit 1: It's a happy day!",
    title: "Text 1.7: Elephant's Day",
    text: "Elephant gets up in the morning and stretches his body. Then he has a big breakfast. Elephant doesn't go to school, he plays! He plays in the afternoon and has fun. He has dinner in the evening and sings. At ten o'clock at night, Elephant doesn't play or sing; he goes to bed."
  },
  {
    id: "l3_u2_t5",
    level: 3,
    unit: "Unit 2: Let's dress up!",
    title: "Text 2.5: The Dressing Up Game",
    text: "The girls are in their bedroom with a dressing up box. They play a game and count to ten. Now the girls are wearing a colourful mixture of clothes. They are wearing coats and slippers. They've got handbags, keys and glasses. The glasses are on their head near their ears."
  },
  {
    id: "l3_u2_t6",
    level: 3,
    unit: "Unit 2: Let's dress up!",
    title: "Text 2.6: Dad's Special Tracksuit",
    text: "I am at home with Dad. Dad has got a special book with lots of pictures. Dad points to a picture when he was sixteen. He was in a football team with a tracksuit and trainers. Their tracksuits and trainers were red. Dad gives me his red clothes, and now I am in the football team too!"
  },
  {
    id: "l3_u3_t5",
    level: 3,
    unit: "Unit 3: Hobbies",
    title: "Text 3.5: Helpers Team Picnic",
    text: "Fatma has tennis lessons at 9 o'clock. At 10 o'clock, she doesn't play tennis; she skateboards. At 11 o'clock, she doesn't watch TV; she roller-skates. The children look for Fatma and find her under a tree because she is tired. They have a fun picnic together under the tree."
  },
  {
    id: "l3_u3_t6",
    level: 3,
    unit: "Unit 3: Hobbies",
    title: "Text 3.6: The Exciting Camel Race",
    text: "It's Saturday, and it's camel racing day. I watch the camels with Dad. I see a cute camel with long legs and big eyes named Farha. Farha runs fast in the race, but then she stops. I take a peach from Dad and ride my bike to Farha. She sees the peach, runs very fast, and wins the race!"
  },
  {
    id: "l3_u4_t5",
    level: 3,
    unit: "Unit 4: I want to be a doctor!",
    title: "Text 4.5: The Helpers Team Job Fair",
    text: "The Helpers Team visits a job fair. Aunt Aseel introduces Mr Ibrahim, who is a chef. Then they meet Mr Ahmed, a pilot who can fly a plane. Lisa feels unwell, so Mrs Shahad, who is a doctor, gives her medicine. Lisa feels better and says she wants to be a doctor. Aunt Aseel goes home by plane, and Polly and Atomic want to be artists!"
  }
];

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showStudentModal, setShowStudentModal] = useState(true);
  const [filterLevel, setFilterLevel] = useState("all");
  const [recordings, setRecordings] = useState({});
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  // Load saved local data
  useEffect(() => {
    try {
      const savedRecs = localStorage.getItem('reading_rabbit_recordings');
      const savedRatings = localStorage.getItem('reading_rabbit_ratings');
      const savedComments = localStorage.getItem('reading_rabbit_comments');
      const savedStudent = localStorage.getItem('reading_rabbit_current_student');

      if (savedRecs) setRecordings(JSON.parse(savedRecs));
      if (savedRatings) setRatings(JSON.parse(savedRatings));
      if (savedComments) setComments(JSON.parse(savedComments));
      if (savedStudent) {
        const parsedStudent = JSON.parse(savedStudent);
        setSelectedStudent(parsedStudent.name);
        setSelectedLevel(parsedStudent.level);
        setFilterLevel(parsedStudent.level.toString());
        setShowStudentModal(false);
      }
    } catch (e) {
      console.error("Error loading localStorage data", e);
    }
  }, []);

  const handleSelectStudent = (studentName, level) => {
    const studentObj = { name: studentName, level: level };
    setSelectedStudent(studentName);
    setSelectedLevel(level);
    setFilterLevel(level.toString());
    setShowStudentModal(false);
    localStorage.setItem('reading_rabbit_current_student', JSON.stringify(studentObj));
  };

  const handleSaveRecording = (passageId, audioBase64) => {
    if (!selectedStudent) return;
    const key = `${selectedStudent}_${passageId}`;
    const newRecordings = { ...recordings, [key]: audioBase64 };
    setRecordings(newRecordings);
    localStorage.setItem('reading_rabbit_recordings', JSON.stringify(newRecordings));
  };

  const handleDeleteRecording = (passageId) => {
    if (!selectedStudent) return;
    const key = `${selectedStudent}_${passageId}`;
    const newRecordings = { ...recordings };
    delete newRecordings[key];
    setRecordings(newRecordings);
    localStorage.setItem('reading_rabbit_recordings', JSON.stringify(newRecordings));
  };

  const handleRatingChange = (passageId, newRating) => {
    if (!selectedStudent) return;
    const key = `${selectedStudent}_${passageId}`;
    const newRatings = { ...ratings, [key]: newRating };
    setRatings(newRatings);
    localStorage.setItem('reading_rabbit_ratings', JSON.stringify(newRatings));
  };

  const handleCommentChange = (passageId, comment) => {
    if (!selectedStudent) return;
    const key = `${selectedStudent}_${passageId}`;
    const newComments = { ...comments, [key]: comment };
    setComments(newComments);
    localStorage.setItem('reading_rabbit_comments', JSON.stringify(newComments));
  };

  const filteredPassages = PASSAGES_DATA.filter(p => {
    if (filterLevel === "all") return true;
    return p.level === parseInt(filterLevel);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-purple-50 to-pink-100 font-sans pb-12 text-slate-700">
      {/* Header Banner */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-md border-b-4 border-amber-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-amber-300 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
              <span className="text-2xl animate-bounce">🐰</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 tracking-wide">
                Reading Rabbit
              </h1>
              <p className="text-xs font-semibold text-purple-400">Read, Record & Learn Together! ✨</p>
            </div>
          </div>

          {/* Student Selector Card */}
          <div className="flex items-center gap-2">
            {selectedStudent ? (
              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-pink-100 border-2 border-amber-300 rounded-full px-4 py-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center text-sm shadow">
                    {selectedStudent.charAt(0)}
                  </span>
                  <div>
                    <p className="text-xs text-purple-600 font-semibold leading-none">Reading Star</p>
                    <p className="text-sm font-extrabold text-slate-800 leading-tight">{selectedStudent}</p>
                  </div>
                </div>
                <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  Level {selectedLevel}
                </span>
                <button 
                  onClick={() => setShowStudentModal(true)}
                  className="bg-white hover:bg-purple-100 text-purple-600 p-1.5 rounded-full transition-colors shadow-sm"
                  title="Switch Student"
                >
                  <UserCheck className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowStudentModal(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-5 py-2 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Smile className="w-5 h-5" /> Select Student
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-amber-200 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-32 h-32 bg-pink-200 rounded-full blur-2xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Welcome Readers! 🌟
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-purple-900">
                {selectedStudent ? `Hello, ${selectedStudent}! 👋` : "Pick your name to start reading!"}
              </h2>
              <p className="text-slate-600 font-medium max-w-xl text-sm md:text-base">
                Choose a passage below, tap the microphone button to record your voice reading out loud, and listen back to earn golden stars! 
              </p>
            </div>

            {/* Level Filter Buttons */}
            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by Level:
              </span>
              <div className="flex flex-wrap justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setFilterLevel("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    filterLevel === "all"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All
                </button>
                {[1, 2, 3].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setFilterLevel(lvl.toString())}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filterLevel === lvl.toString()
                        ? "bg-purple-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Level {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPassages.map(passage => {
            const key = selectedStudent ? `${selectedStudent}_${passage.id}` : null;
            const savedAudio = key ? recordings[key] : null;
            const savedRating = key ? ratings[key] || 0 : 0;
            const savedComment = key ? comments[key] || "" : "";

            return (
              <PassageCard
                key={passage.id}
                passage={passage}
                selectedStudent={selectedStudent}
                savedAudio={savedAudio}
                savedRating={savedRating}
                savedComment={savedComment}
                onSaveRecording={(audio) => handleSaveRecording(passage.id, audio)}
                onDeleteRecording={() => handleDeleteRecording(passage.id)}
                onRatingChange={(r) => handleRatingChange(passage.id, r)}
                onCommentChange={(c) => handleCommentChange(passage.id, c)}
                onRequestStudent={() => setShowStudentModal(true)}
              />
            );
          })}
        </div>
      </main>

      {/* Student Selection Modal */}
      {showStudentModal && (
        <StudentModal
          onSelectStudent={handleSelectStudent}
          onClose={() => selectedStudent && setShowStudentModal(false)}
          currentStudent={selectedStudent}
        />
      )}
    </div>
  );
}

// Individual Passage Card with Audio Recorder & Rating
function PassageCard({
  passage,
  selectedStudent,
  savedAudio,
  savedRating,
  savedComment,
  onSaveRecording,
  onDeleteRecording,
  onRatingChange,
  onCommentChange,
  onRequestStudent
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(savedAudio || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState(savedComment);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    setAudioUrl(savedAudio);
  }, [savedAudio]);

  useEffect(() => {
    setTeacherNotes(savedComment);
  }, [savedComment]);

  // Handle Recording Toggle
  const startRecording = async () => {
    if (!selectedStudent) {
      onRequestStudent();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result;
          setAudioUrl(base64Audio);
          onSaveRecording(base64Audio);
        };
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      alert("Microphone access is required to record reading! Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleAudioPlayToggle = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getLevelBadgeColor = (lvl) => {
    if (lvl === 1) return "bg-emerald-100 text-emerald-700 border-emerald-300";
    if (lvl === 2) return "bg-amber-100 text-amber-700 border-amber-300";
    return "bg-purple-100 text-purple-700 border-purple-300";
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-purple-100 flex flex-col justify-between relative group">
      
      {/* Top Header info */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getLevelBadgeColor(passage.level)}`}>
            Level {passage.level}
          </span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            {passage.unit}
          </span>
        </div>

        {/* Text Title */}
        <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-pink-500 flex-shrink-0" />
          {passage.title}
        </h3>

        {/* Reading Passage Body */}
        <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 mb-6">
          <p className="text-slate-800 text-base md:text-lg leading-relaxed font-medium tracking-wide">
            "{passage.text}"
          </p>
        </div>
      </div>

      {/* Voice Recording Controls */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <Volume2 className="w-4 h-4 text-purple-500" /> Voice Recording
          </span>

          {audioUrl && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> Recorded
            </span>
          )}
        </div>

        {/* Recording Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
          
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-4 py-2.5 rounded-xl shadow transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Mic className="w-4 h-4 animate-pulse" />
              {audioUrl ? "Record Again" : "Start Recording"}
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl shadow transition-all animate-bounce text-sm"
            >
              <Square className="w-4 h-4 fill-current" />
              Stop ({formatTime(recordingTime)})
            </button>
          )}

          {/* Player controls if audio exists */}
          {audioUrl && !isRecording && (
            <div className="flex items-center gap-2">
              <audio
                ref={audioPlayerRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
              <button
                onClick={handleAudioPlayToggle}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 shadow transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                {isPlaying ? "Pause" : "Listen"}
              </button>

              <button
                onClick={() => {
                  onDeleteRecording();
                  setAudioUrl(null);
                }}
                className="bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 p-2 rounded-xl transition-colors"
                title="Delete Recording"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Star Rating & Teacher Feedback */}
        {selectedStudent && (
          <div className="pt-2 border-t border-slate-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Reading Stars:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onRatingChange(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= savedRating
                          ? "fill-amber-400 text-amber-400 drop-shadow"
                          : "text-slate-300 hover:text-amber-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Note/Feedback input */}
            <div>
              <input
                type="text"
                placeholder="Add teacher note or encouragement..."
                value={teacherNotes}
                onChange={(e) => {
                  setTeacherNotes(e.target.value);
                  onCommentChange(e.target.value);
                }}
                className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Student Selection Modal Component
function StudentModal({ onSelectStudent, onClose, currentStudent }) {
  const [activeTabLevel, setActiveTabLevel] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = STUDENTS_DATA[activeTabLevel].filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 p-6 text-white text-center relative">
          <div className="text-4xl mb-2">🐰✨</div>
          <h2 className="text-2xl font-extrabold tracking-wide">Who is Reading Today?</h2>
          <p className="text-xs text-purple-100 font-medium">Select your level and name to record your reading!</p>
          
          {currentStudent && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Level Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          {[1, 2, 3].map(lvl => (
            <button
              key={lvl}
              onClick={() => setActiveTabLevel(lvl)}
              className={`flex-1 py-3 text-center text-sm font-bold transition-all border-b-4 ${
                activeTabLevel === lvl
                  ? "border-pink-500 text-pink-600 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Level {lvl} ({STUDENTS_DATA[lvl].length})
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-white border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((name) => (
              <button
                key={name}
                onClick={() => onSelectStudent(name, activeTabLevel)}
                className="flex items-center justify-between p-3 rounded-2xl border-2 border-slate-100 hover:border-pink-300 hover:bg-pink-50/50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-110 transition-transform">
                    {name.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-800 text-sm">{name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-pink-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-slate-400 text-sm">
              No student found matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs font-semibold text-slate-500">
          Total 30 Students Enrolled 🌟
        </div>
      </div>
    </div>
  );
}