package router

import (
	"server/middleware"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/skill", middleware.GetAllSkills).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/skill", middleware.CreateSkill).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/findSkills/{search}", middleware.GetSelectSkills).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/deleteSkill/{id}", middleware.DeleteSkill).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/editSkill/{id}", middleware.EditSkill).Methods("PUT", "OPTIONS")

	return router
}
