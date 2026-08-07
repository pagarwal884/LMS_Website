import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Loading from "../../components/students/Loading";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Player = () => {
  const { id } = useParams();
  const { allCourses, calculateChapterTime, calculateCourseDuration } =
    useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [active, setActive] = useState({ chapter: 0, lecture: 0 });

  useEffect(() => {
    if (allCourses.length > 0) {
      const found = allCourses.find((c) => c._id === id) || allCourses[0];
      setCourseData(found);

      // default to first available lecture
      const firstChapter = found?.courseContent?.[0];
      const firstLecture = firstChapter?.chapterContent?.[0];
      if (firstLecture) {
        setPlayerData({ videoId: getYoutubeId(firstLecture.lectureUrl) });
        setActive({ chapter: 0, lecture: 0 });
      }
    }
  }, [allCourses, id]);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/
    );
    return match ? match[1] : null;
  };

  if (!courseData) return <Loading />;

  return (
    <div className="bg-gradient-to-b from-cyan-100/60 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video + details (left) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {playerData ? (
                <YouTube
                  videoId={playerData.videoId}
                  opts={{ playerVars: { autoplay: 0 } }}
                  iframeClassName="w-full aspect-video"
                />
              ) : (
                <img
                  src={courseData.courseThumbnail}
                  alt={courseData.courseTitle}
                  className="w-full aspect-video object-cover"
                />
              )}

              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {courseData.courseTitle}
                </h1>

                <p className="mt-3 text-gray-700">
                  {courseData.courseDescription
                    ? "Course content plays on the left. Use the playlist to the right to jump between lectures."
                    : ""}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <img src={assets.time_clock_icon} alt="" className="w-4 h-4" />
                    <span>{calculateCourseDuration(courseData)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={assets.lesson_icon} alt="" className="w-4 h-4" />
                    <span>{courseData.courseContent.length} Chapters</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapters & Lectures */}
            <div className="mt-6 space-y-3">
              {courseData.courseContent.map((chapter, cIdx) => (
                <div key={chapter.chapterId} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 flex items-center justify-between cursor-default">
                    <div className="flex items-center gap-3">
                      <img src={assets.down_arrow_icon} alt="" className="w-4 h-4" />
                      <div>
                        <p className="font-medium">{chapter.chapterTitle}</p>
                        <p className="text-xs text-gray-500">{chapter.chapterContent.length} lectures · {calculateChapterTime(chapter)}</p>
                      </div>
                    </div>
                  </div>

                  <ul className="divide-y divide-gray-100">
                    {chapter.chapterContent.map((lecture, lIdx) => {
                      const isActive = active.chapter === cIdx && active.lecture === lIdx;
                      return (
                        <li key={lecture.lectureId} className={`px-4 py-3 flex items-start gap-3 ${isActive ? 'bg-blue-50' : ''}`}>
                          <img src={assets.play_icon} alt="" className="w-5 h-5 mt-1" />
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-800">{lecture.lectureTitle}</p>
                              <p className="text-xs text-gray-500 mt-1">{lecture.isPreviewFree ? 'Preview available' : ''}</p>
                            </div>

                            <div className="flex items-center gap-4">
                              <p className="text-xs text-gray-500">{lecture.lectureDuration} min</p>
                              <button
                                onClick={() => {
                                  setPlayerData({ videoId: getYoutubeId(lecture.lectureUrl) });
                                  setActive({ chapter: cIdx, lecture: lIdx });
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`text-sm font-medium px-3 py-1 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                              >
                                Play
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
              <img src={courseData.courseThumbnail} alt={courseData.courseTitle} className="w-full aspect-video object-cover" />

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{courseData.courseTitle}</h3>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Lectures</div>
                    <div className="text-sm font-medium text-gray-900">{courseData.courseContent.reduce((acc, ch) => acc + ch.chapterContent.length, 0)}</div>
                  </div>

                  <div className="mt-3 text-sm text-gray-600">Duration <span className="font-medium text-gray-900">{calculateCourseDuration(courseData)}</span></div>
                </div>

                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">Go to Course</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Player;
