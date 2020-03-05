package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Skill struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name  string             `json:"name,omitempty"`
	Link  string             `json:"link,omitempty"`
	Image string             `json:"image,omitempty"`
	Tags  string             `json:"tags,omitempty"`
}
