-- updateCourseNameProcedure.sql
DELIMITER //
CREATE PROCEDURE UpdateCourseName(IN param1 VARCHAR(255), IN param2 VARCHAR(255))
BEGIN
  UPDATE mahadbt_profiles
  SET coursename = CONCAT('india ', coursename)
  WHERE coursename = 'BCA';
END //
DELIMITER ;


-- DELIMITER //
-- CREATE PROCEDURE Updaterefcode(IN param1 VARCHAR(255), IN param2 VARCHAR(255))
-- BEGIN
--   UPDATE mahadbt_profiles
--   SET ref_code = CONCAT('BE ', ref_code)
--   -- WHERE course_name;
-- END //
-- DELIMITER ;

call UpdateCourseName()
-- call Updaterefcode()