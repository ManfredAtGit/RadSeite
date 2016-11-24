# read gpx-tracks and display via leaflet >>> Work in Progress  <<<

# GPX-Tracks with leaflet example

# init
setwd("D:/Vizz/leafletMaps/gpxTracks")
library(leaflet)
library(maps)
library(rgdal)

# define base map
m <- leaflet() %>%
    # Add tiles as baseGroup
	addTiles(group = "OSM (default)") %>%
	#addProviderTiles("HERE.normalDay", group = "HERE.normalDay") %>%
	addProviderTiles("OpenStreetMap.BlackAndWhite", group = "OpenStreetMap.BlackAndWhite") 
	#%>% addProviderTiles("CartDB.Positron", group = "CartDB.Positron") 
m <- m %>%
	# Layers control
	addLayersControl(
	  #baseGroups = c("OSM (default)","HERE.normalDay","OpenStreetMap.BlackAndWhite", "CartDB.Positron"),
	  baseGroups = c("OSM (default)","OpenStreetMap.BlackAndWhite"),
	  #overlayGroups = c("Typ-1","Typ-2"),
	  overlayGroups = c("Tour","RTF","Reise","ARA"),
	  options = layersControlOptions(collapsed = FALSE)
	)	

m <- m %>% setView(lng = 7.5, lat = 51.4, zoom = 10) # set centre and extent of map

# scan data-dir
setwd("./data/")
files <- dir(pattern = "\\.gpx")
setwd("../")

# read file for track-type info
filename <- "Touren.csv"
trkTyp <-read.csv(filename,header=TRUE,sep=",")
# set colors for typ
art= c("Tour","ARA","Reise","RTF")
artCol= c("green","black","blue","red")
colMap = data.frame(art,artCol)
#as.character(colMap[which(art==as.character(trkTyp[i,]$Typ)),]$artCol)

# generate 2 artifical groups, will be replaced by trkTyp
l=length(files)
trkGrp=c()
trkGrp=c(trkGrp,rep("Typ-1",l%/%2))
trkGrp=c(trkGrp,rep("Typ-2",l-l%/%2))

# iterate over track-files found in data dir
index <- c()
#library(plotKML)
#route <- readGPX(dsn=paste("./data/",files[i],sep=""),layer="tracks")

library(htmltools) 
for (i in 1:length(files)) {
  route <- readOGR(dsn=paste("./data/",files[i],sep=""),layer="tracks")
  content = htmlEscape(substr(files[i], 1, nchar(files[i])-4))
  trkGroup = as.character(trkTyp[i,]$Typ)
  trkCol = as.character(colMap[which(art==trkGroup),]$artCol)
  m <- m %>%  
  # Add layers as overlayGroup
  addPolylines(color=trkCol, , weight = 4,  popup=content, , group = trkGroup, data=route) 
  #addPolylines(color="red", , weight = 4,  popup=content, , group = trkGrp[i], data=route) 
}

# display map
m

>>>>>>>>>>>>>>>>> STOP HERE >>>>>>>>>>>>>>>>>>>>
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


for (i in 1:length(files)) {

  route <- readGPX(dsn=paste("./data/",files[i],sep=""),layer="tracks")
  location <- route$tracks[[1]][[1]]

  index <- c(index, rep(i, dim(location)[1]))
  lat <- c(lat, location$lat)
  long <- c(long, location$lon)
}





tours <- readOGR(".", layer = "tracks", encoding='UTF-8')
del <- readOGR(dsn = "files[1]", layer="tracks")
del <- readOGR(dsn=paste("./data/",files[1],sep=""),layer="tracks")

 del1 <- lapply(files, function(x) readOGR(dsn=paste("./data/",x,sep=""),layer="tracks") )

 
 
 #
 m <- leaflet() %>%
  addTiles()
 m %>% setView(lng = 7.5, lat = 51.4, zoom = 10) # set centre and extent of map
 m <- leaflet(del1) %>%

            # Add tiles as baseGroup
			addTiles(group = "OSM (default)") %>%
			addProviderTiles("HERE.normalDay", group = "HERE.normalDay") %>%
            addProviderTiles("OpenTopoMap", group = "MapQuestOpen.Aerial") %>%
            addProviderTiles("MapQuestOpen.Aerial", group = "MapQuestOpen.Aerial") %>%
            addProviderTiles("OpenMapSurfer.Roads", group = "OpenMapSurfer.Roads") %>%

            
            # Add layers as overlayGroup
            addPolylines(color="red", , weight = 4,  popup="PCT", , group = "PCT")  %>%
            addMarkers(7.5, 51.4, popup = "Here we are", group="TestMarker") %>%
			addMarkers(7.0, 51.4, popup = "Here we go", group="TestMarker") %>%
            #addMarkers(-120.7816, 49.06465, popup = "Manning Park, Canada", group="Northern Terminus") %>%
            #hideGroup("Southern Terminus") %>%
            #hideGroup("Northern Terminus") %>%
            #addPolygons(data=mapStates, fillColor = heat.colors(3, alpha = NULL), stroke = FALSE, group = "States")  %>%
                        
            # Layers control
            addLayersControl(
              baseGroups = c("OSM (default)","HERE.normalDay","MapQuestOpen.Aerial", "OpenTopoMap", "OpenMapSurfer.Roads"),
              overlayGroups = c("PCT", "TestMarker"),
              options = layersControlOptions(collapsed = FALSE)
            ) 