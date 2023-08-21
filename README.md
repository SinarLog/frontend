# SinarLog frontend

Made with Create React App

## Introduction

This repository stores the code of SinarLog's backend application. SinarLog is an application that makes attendances easier than ever. Users are able to manage their attendances and HRs are able to view their employees' attendances. With SinarLog, applying for leave request is even better. Staff and/or managers do not need to hassle just to apply leave. This also benefits HRs on approving and disapproving a leave request.

## Getting Started

For the current version of SinarLog, we focus on three entities. A staff, manager and an HR. A staff can only have one manager and managers can have many staffs. HR on the other hand, acts as an admin. HR does not have a manager nor staffs under them. They are a stand alone unit of admin functionalities.

With SinarLog, staff and managers can manage their attendances. Clocking in and out as well as requesting a leave. HR can view employees' attendances and accept or reject a leave request. Since a staff is under a manager, managers can also accep or reject their staffs' leave request.

As of until the end of August 2023, SinarLog's website can be visited with the following [link](https://sinarlog.web.app)

## Development

Hot-reloading with Docker:
`docker compose up`
